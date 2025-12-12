'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { parseAnsi, AnsiSpan } from './utils';
import {
    initializeGame,
    processUserShot,
    processAlienShot,
    formatGrid,
    getGameStats,
    resetAlienAI,
    type GameState,
} from './game-engine';

type GamePhase = 'intro' | 'briefing' | 'playing' | 'gameover';

export default function SpaceShipBattlePage() {
    const [outputLines, setOutputLines] = useState<AnsiSpan[][]>([]);
    const [inputValue, setInputValue] = useState('');
    const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [waitingForShot, setWaitingForShot] = useState(false);
    const [canShootAgain, setCanShootAgain] = useState(false);
    const [alienTurnPending, setAlienTurnPending] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    // Scroll to bottom on new output
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [outputLines]);

    // Add message to output
    const addOutput = (text: string) => {
        const spans = parseAnsi(text);
        setOutputLines((prev) => [...prev, spans]);
    };

    // Initialize game with intro
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        addOutput('\x1b[1;36m║\x1b[1;97m              SPACE DEFENSE: OPERATION XYLON                \x1b[1;36m║\x1b[0m');
        addOutput('\x1b[0;37mThe year is 4025, humanity has colonized the outer rim of the Milky Way Galaxy.\x1b[0m');
        addOutput('\x1b[0;37mPlanet Xylon, known for their rare minerals, has become the target of an \x1b[1;31mAlien Attack\x1b[0;37m.\x1b[0m\n');
        addOutput('  \x1b[1;33mYOUR MISSION:\x1b[0m');
        addOutput('\x1b[0;32m   1. Defend the population living on Planet Xylon.\x1b[0m');
        addOutput('\x1b[0;32m   2. Destroy the Alien Ships before they destroy your fleet and invade Planet Xylon.\x1b[0m\n');
        addOutput("\x1b[1;36mEnter '1' to accept the mission:\x1b[0m");
    }, []);

    const startBriefing = () => {
        addOutput('\x1b[1;36m║\x1b[1;97m                         BRIEFING                           \x1b[1;36m║\x1b[0m');
        addOutput('\x1b[1;33mRULES OF ENGAGEMENT:\x1b[0m');
        addOutput('\x1b[0;37m  • Take turns firing at enemy coordinates\x1b[0m');
        addOutput('\x1b[0;37m  • Direct hits grant another shot immediately\x1b[0m');
        addOutput("\x1b[0;37m  • Ships marked as \x1b[0;35m'S'\x1b[0;37m, hits as \x1b[0;31m'X'\x1b[0;37m, misses as \x1b[0;37m'O'\x1b[0m");
        addOutput('\x1b[0;37m  • Destroy all enemy vessels to complete the mission\x1b[0m\n');
        addOutput("\x1b[1;36mIf you are ready for battle, enter '1' to deploy:\x1b[0m");
        setGamePhase('briefing');
    };

    const startGame = () => {
        resetAlienAI();
        const newGameState = initializeGame();
        setGameState(newGameState);

        addOutput('\n\x1b[1;32mDeploying your defensive fleet...\x1b[0m');
        addOutput('\x1b[1;31mEnemy forces detected and locked...\x1b[0m');
        addOutput('\x1b[1;33m               YOUR TARGETING GRID \x1b[0m');
        addOutput(formatGrid(newGameState.shotMap, false));
        addOutput('\x1b[1;33m               YOUR DEFENSIVE GRID \x1b[0m');
        addOutput(formatGrid(newGameState.userMap, true));
        addOutput('\n\n\x1b[1;31m⚔ \x1b[1;97mTHE BATTLE BEGINS!\x1b[1;31m ⚔\x1b[0m\n');
        addOutput('\x1b[1;32m Your turn! Enter target coordinates (Column A-H, Row 1-8):\x1b[0m');

        setGamePhase('playing');
        setWaitingForShot(true);
    };

    const handleUserShot = (input: string) => {
        if (!gameState) return;

        // Parse input like "A5" or "a 5"
        const match = input.trim().match(/^([a-hA-H])\s*(\d+)$/);
        if (!match) {
            addOutput('Invalid input. Please enter a letter followed by a number (e.g. A5).');
            addOutput(' Your turn! Enter target coordinates (Column A-H, Row 1-8):');
            return;
        }

        const colLetter = match[1];
        const row = parseInt(match[2]);

        const result = processUserShot(gameState, colLetter, row);

        if (result.alreadyShot) {
            addOutput(result.message);
            addOutput(' Your turn! Enter target coordinates (Column A-H, Row 1-8):');
            return;
        }

        addOutput(result.message);

        // Update grids
        addOutput('\x1b[1;33m                     YOUR TARGETING GRID \x1b[0m');
        addOutput(formatGrid(gameState.shotMap, false));
        addOutput(`\x1b[1;31mEnemy vessels remaining: ${gameState.alienShips}/14\x1b[0m`);

        addOutput('\x1b[1;33m                     YOUR DEFENSIVE GRID \x1b[0m');
        addOutput(formatGrid(gameState.userMap, true));
        addOutput(`\x1b[1;32mYour vessels remaining: ${gameState.userShips}/14\x1b[0m`);

        if (result.gameOver && result.winner === 'user') {
            addOutput('\x1b[1;32m║\x1b[1;97m                    MISSION COMPLETE!                       \x1b[1;32m║\x1b[0m');
            addOutput('\x1b[1;32mAll enemy forces have been neutralized!\x1b[0m');
            addOutput('\x1b[1;32mPlanet Xylon is safe. The citizens celebrate your victory!\x1b[0m\n');
            addOutput(getGameStats(gameState));
            setGamePhase('gameover');
            setWaitingForShot(false);
            return;
        }

        if (result.hit) {
            // User gets to shoot again
            addOutput('\n\x1b[1;32m Your turn! Enter target coordinates (Column A-H, Row 1-8):\x1b[0m');
            setCanShootAgain(true);
            setWaitingForShot(true);
        } else {
            // Alien's turn
            addOutput(`\n\x1b[0;36m--- Turn ${gameState.turnNumber} Complete ---\x1b[0m`);
            gameState.turnNumber++;
            setWaitingForShot(false);
            setCanShootAgain(false);
            setAlienTurnPending(true);
            // Delay alien's turn slightly for better UX
            setTimeout(() => handleAlienTurn(), 1000);
        }

        setGameState({ ...gameState });
    };

    const handleAlienTurn = () => {
        if (!gameState) return;

        let alienCanShootAgain = true;

        while (alienCanShootAgain && gameState.alienShips > 0 && gameState.userShips > 0) {
            addOutput('\n\x1b[1;31mEnemy targeting systems activated...\x1b[0m');
            const alienResult = processAlienShot(gameState);
            addOutput(alienResult.message);

            addOutput('\x1b[1;33m                 YOUR TARGETING GRID \x1b[0m');
            addOutput(formatGrid(gameState.shotMap, false));
            addOutput(`\x1b[1;31mEnemy vessels remaining: ${gameState.alienShips}/14\x1b[0m`);

            addOutput('\x1b[1;33m                   YOUR DEFENSIVE GRID  \x1b[0m');
            addOutput(formatGrid(gameState.userMap, true));
            addOutput(`\x1b[1;32mYour vessels remaining: ${gameState.userShips}/14\x1b[0m`);

            if (alienResult.gameOver && alienResult.winner === 'alien') {
                addOutput('\x1b[1;31m║\x1b[1;97m                   MISSION FAILED                           \x1b[1;31m║\x1b[0m');
                addOutput('\x1b[1;31mAll defensive vessels destroyed...\x1b[0m');
                addOutput('\x1b[1;31mThe alien forces have invaded Planet Xylon.\x1b[0m');
                addOutput("\x1b[1;31mHumanity's foothold in this sector has been lost.\x1b[0m\n");
                addOutput(getGameStats(gameState));
                setGamePhase('gameover');
                setAlienTurnPending(false);
                setWaitingForShot(false);
                return;
            }

            alienCanShootAgain = alienResult.hit;
        }

        // User's turn again
        addOutput('\n\x1b[1;32m Your turn! Enter target coordinates (Column A-H, Row 1-8):\x1b[0m');
        setWaitingForShot(true);
        setAlienTurnPending(false);
        setGameState({ ...gameState });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Echo user input
        const inputSpans = [{ text: '> ' + inputValue, style: { color: '#00ff00', fontWeight: 'bold' } }];
        setOutputLines((prev) => [...prev, inputSpans]);

        const input = inputValue.trim();
        setInputValue('');

        if (gamePhase === 'intro') {
            if (input === '1') {
                startBriefing();
            } else {
                addOutput('Invalid input. Please enter 1 to accept the mission:');
            }
        } else if (gamePhase === 'briefing') {
            if (input === '1') {
                startGame();
            } else {
                addOutput('Invalid input. Please enter 1 to deploy:');
            }
        } else if (gamePhase === 'playing' && waitingForShot && !alienTurnPending) {
            handleUserShot(input);
        }
    };

    const getPlaceholder = () => {
        if (gamePhase === 'intro') return "Enter '1' to accept...";
        if (gamePhase === 'briefing') return "Enter '1' to deploy...";
        if (gamePhase === 'playing' && waitingForShot) return 'Enter coordinates (e.g., A5)...';
        if (gamePhase === 'playing' && alienTurnPending) return 'Alien turn in progress...';
        if (gamePhase === 'gameover') return 'Game over - refresh to play again';
        return 'Waiting...';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8 font-mono">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition font-sans">
                    <ArrowLeft size={20} />
                    Back to Portfolio
                </Link>

                <div className="bg-black/80 rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col h-[80vh]">
                    {/* Header */}
                    <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-2 text-sm text-slate-400 font-sans">Space Defense: Operation Xylon</span>
                        </div>
                        {gamePhase === 'playing' && (
                            <span className="text-green-400 text-sm">
                                {alienTurnPending ? '🔴 Alien Turn' : '🟢 Your Turn'}
                            </span>
                        )}
                    </div>

                    {/* Terminal Output */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-1 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                        {outputLines.map((line, i) => (
                            <div key={i} className="whitespace-pre-wrap break-words leading-snug">
                                {line.map((span, j) => (
                                    <span key={j} style={span.style}>
                                        {span.text}
                                    </span>
                                ))}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-4 bg-slate-800/50 border-t border-slate-700 flex gap-2">
                        <span className="text-green-500 py-2">{'>'}</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white font-mono py-2 focus:ring-0"
                            placeholder={getPlaceholder()}
                            disabled={gamePhase === 'gameover' || alienTurnPending}
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!inputValue || gamePhase === 'gameover' || alienTurnPending}
                            className="p-2 text-blue-400 hover:text-blue-300 disabled:opacity-50 transition"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>

                <div className="mt-6 text-center text-slate-500 text-sm font-sans">
                    <p>Powered by JavaScript & React</p>
                </div>
            </div>
        </div>
    );
}

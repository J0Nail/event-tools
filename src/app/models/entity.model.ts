export interface Affliction {
    name: string;
    turnsRemaining: number;
}

export interface Bonus {
    name: string;
    turnsRemaining: number;
}

export interface Entity {
    id: number;
    name: string;
    hp: number;
    newHp: number;
    afflictions: Affliction[];
    bonus: Bonus[];
    eliminated: boolean;
    newAffliction: string;
    newAfflictionTurns: number;
    newBonus: string;
    newBonusTurns: number;
    difficulty: number;
}
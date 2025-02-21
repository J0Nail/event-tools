export interface Affliction {
    name: string;
    turnsRemaining: number;
    atkEffect: number;
    defEffect: number;
    healEffect: number;
    shieldEffect: number;
    damageEffect: number;
    [key: string]: number | string;
}

export interface Renfort {
    name: string;
    turnsRemaining: number;
    atkEffect: number;
    defEffect: number;
    healEffect: number;
    shieldEffect: number;
    damageEffect: number;
    [key: string]: number | string;
}

export interface Entity {
    id: number;
    name: string;
    hp: number;
    newHp: number;
    afflictions: Affliction[];
    renforts: Renfort[];
    eliminated: boolean;
    newAffliction: string;
    newAfflictionTurns: number;
    newRenfort: string;
    newRenfortTurns: number;
    difficulty: number;
    newRenfortEffectType: string;
    newRenfortEffectValue: number;
    newAfflictionEffectType: string;
    newAfflictionEffectValue: number;
    damageEffect?: number;
}
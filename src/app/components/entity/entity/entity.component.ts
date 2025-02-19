import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Affliction {
  name: string;
  turnsRemaining: number;
}

interface Bonus {
  name: string;
  turnsRemaining: number;
}

interface Entity {
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
}

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent {
  @Input() entity!: Entity;
  @Output() delete = new EventEmitter<Entity>();
  @Output() update = new EventEmitter<void>();

  setHp() {
    this.entity.hp = this.entity.newHp;
    this.entity.newHp = 0;
    this.update.emit();
  }

  healEntity() {
    this.entity.hp++;
    this.update.emit();
  }

  damageEntity() {
    this.entity.hp--;
    this.update.emit();
  }

  setAffliction() {
    if (this.entity.newAffliction.trim()) {
      const existingAffliction = this.entity.afflictions.find(affliction => affliction.name === this.entity.newAffliction);
      if (existingAffliction) {
        existingAffliction.turnsRemaining = this.entity.newAfflictionTurns;
      } else {
        const newAffliction: Affliction = {
          name: this.entity.newAffliction,
          turnsRemaining: this.entity.newAfflictionTurns
        };
        this.entity.afflictions.push(newAffliction);
      }
      this.entity.newAffliction = '';
      this.entity.newAfflictionTurns = 0;
      this.update.emit();
    }
  }

  removeAffliction(affliction: Affliction) {
    this.entity.afflictions = this.entity.afflictions.filter(a => a !== affliction);
    this.update.emit();
  }

  setBonus() {
    if (this.entity.newBonus.trim()) {
      const existingBonus = this.entity.bonus.find(bonus => bonus.name === this.entity.newBonus);
      if (existingBonus) {
        existingBonus.turnsRemaining = this.entity.newBonusTurns;
      } else {
        const newBonus: Bonus = {
          name: this.entity.newBonus,
          turnsRemaining: this.entity.newBonusTurns
        };
        this.entity.bonus.push(newBonus);
      }
      this.entity.newBonus = '';
      this.entity.newBonusTurns = 0;
      this.update.emit();
    }
  }

  removeBonus(bonus: Bonus) {
    this.entity.bonus = this.entity.bonus.filter(b => b !== bonus);
    this.update.emit();
  }

  toggleEliminated() {
    this.entity.eliminated = !this.entity.eliminated;
    this.update.emit();
  }
}
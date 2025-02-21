import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Entity, Affliction, Renfort } from '../../models/entity.model';

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

  setEffect(effectList: any[], newEffectName: string, newEffectTurns: number, newEffectType: string, newEffectValue: number, effectType: 'affliction' | 'renfort') {
    if (newEffectName.trim()) {
      const existingEffect = effectList.find(effect => effect.name === newEffectName);
      if (existingEffect) {
        existingEffect.turnsRemaining = newEffectTurns;
        existingEffect[newEffectType] = newEffectValue;
      } else {
        const newEffect = {
          name: newEffectName,
          turnsRemaining: newEffectTurns,
          atkEffect: newEffectType === 'atkEffect' ? newEffectValue : 0,
          defEffect: newEffectType === 'defEffect' ? newEffectValue : 0,
          healEffect: newEffectType === 'healEffect' ? newEffectValue : 0,
          shieldEffect: newEffectType === 'shieldEffect' ? newEffectValue : 0,
          damageEffect: newEffectType === 'damageEffect' ? newEffectValue : 0
        };
        effectList.push(newEffect);
      }
      if (effectType === 'affliction') {
        this.entity.newAffliction = '';
        this.entity.newAfflictionTurns = 0;
        this.entity.newAfflictionEffectType = '';
        this.entity.newAfflictionEffectValue = 0;
      } else {
        this.entity.newRenfort = '';
        this.entity.newRenfortTurns = 0;
        this.entity.newRenfortEffectType = '';
        this.entity.newRenfortEffectValue = 0;
      }
      this.update.emit();
    }
  }

  setAffliction() {
    this.setEffect(this.entity.afflictions, this.entity.newAffliction, this.entity.newAfflictionTurns, this.entity.newAfflictionEffectType, this.entity.newAfflictionEffectValue, 'affliction');
  }

  setRenfort() {
    this.setEffect(this.entity.renforts, this.entity.newRenfort, this.entity.newRenfortTurns, this.entity.newRenfortEffectType, this.entity.newRenfortEffectValue, 'renfort');
  }

  removeAffliction(affliction: Affliction) {
    this.entity.afflictions = this.entity.afflictions.filter(a => a !== affliction);
    this.update.emit();
  }

  removeRenfort(renfort: Renfort) {
    this.entity.renforts = this.entity.renforts.filter(r => r !== renfort);
    this.update.emit();
  }

  toggleEliminated() {
    this.entity.eliminated = !this.entity.eliminated;
    this.update.emit();
  }

  increaseDifficulty() {
    this.entity.difficulty++;
    this.update.emit();
  }

  decreaseDifficulty() {
    if (this.entity.difficulty > 0) {
      this.entity.difficulty--;
      this.update.emit();
    }
  }
}
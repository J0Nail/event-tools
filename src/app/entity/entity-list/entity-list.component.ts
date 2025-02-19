import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  selector: 'app-entity-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.scss'
})
export class EntityListComponent {
  entities: Entity[] = [];
  newEntityName: string = '';

  ngOnInit() {
    this.loadEntities();
  }

  addEntity() {
    if (this.newEntityName.trim()) {
      const newEntity: Entity = {
        id: Date.now(),
        name: this.newEntityName,
        hp: 0,
        newHp: 0,
        afflictions: [],
        bonus: [],
        eliminated: false,
        newAffliction: '',
        newAfflictionTurns: 0,
        newBonus: '',
        newBonusTurns: 0
      };
      this.entities.push(newEntity);
      this.newEntityName = '';
      this.saveEntities();
    }
  }

  toggleEliminated(entity: Entity) {
    entity.eliminated = !entity.eliminated;
    this.saveEntities();
  }

  deleteEntity(entity: Entity) {
    this.entities = this.entities.filter(e => e.id !== entity.id);
    this.saveEntities();
  }

  setHp(entity: Entity) {
    entity.hp = entity.newHp;
    entity.newHp = 0;
    this.saveEntities();
  }

  healEntity(entity: Entity) {
    entity.hp++;
    this.saveEntities();
  }

  damageEntity(entity: Entity) {
    entity.hp--;
    this.saveEntities();
  }

  setAffliction(entity: Entity) {
    if (entity.newAffliction.trim()) {
      const existingAffliction = entity.afflictions.find(affliction => affliction.name === entity.newAffliction);
      if (existingAffliction) {
        existingAffliction.turnsRemaining = entity.newAfflictionTurns;
      } else {
        const newAffliction: Affliction = {
          name: entity.newAffliction,
          turnsRemaining: entity.newAfflictionTurns
        };
        entity.afflictions.push(newAffliction);
      }
      entity.newAffliction = '';
      entity.newAfflictionTurns = 0;
      this.saveEntities();
    }
  }

  removeAffliction(entity: Entity, affliction: Affliction) {
    entity.afflictions = entity.afflictions.filter(a => a !== affliction);
    this.saveEntities();
  }

  setBonus(entity: Entity) {
    if (entity.newBonus.trim()) {
      const existingBonus = entity.bonus.find(bonus => bonus.name === entity.newBonus);
      if (existingBonus) {
        existingBonus.turnsRemaining = entity.newBonusTurns;
      } else {
        const newBonus: Bonus = {
          name: entity.newBonus,
          turnsRemaining: entity.newBonusTurns
        };
        entity.bonus.push(newBonus);
      }
      entity.newBonus = '';
      entity.newBonusTurns = 0;
      this.saveEntities();
    }
  }

  removeBonus(entity: Entity, bonus: Bonus) {
    entity.bonus = entity.bonus.filter(b => b !== bonus);
    this.saveEntities();
  }

  passTurnForAll() {
    this.entities.forEach(entity => {
      entity.afflictions.forEach(affliction => {
        if (affliction.turnsRemaining > 0) {
          affliction.turnsRemaining--;
        }
      });
      entity.bonus.forEach(bonus => {
        if (bonus.turnsRemaining > 0) {
          bonus.turnsRemaining--;
        }
      });
    });
    this.saveEntities();
  }

  saveEntities() {
    localStorage.setItem('entities', JSON.stringify(this.entities));
  }

  loadEntities() {
    const entities = localStorage.getItem('entities');
    if (entities) {
      this.entities = JSON.parse(entities);
    }
  }
}
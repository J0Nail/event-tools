import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EntityComponent } from '../entity/entity/entity.component';

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
  imports: [CommonModule, FormsModule, EntityComponent],
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {
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

  deleteEntity(entity: Entity) {
    this.entities = this.entities.filter(e => e.id !== entity.id);
    this.saveEntities();
  }

  updateEntities() {
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
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntityComponent } from '../entity/entity.component';
import { Entity, Affliction, Renfort } from '../../models/entity.model';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  diceRollResult: number | null = null;
  diceRollType: string | null = null;
  selectedEntityId: number | null = null;
  targetEntityId: number | null = null;

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
        renforts: [],
        eliminated: false,
        newAffliction: '',
        newAfflictionTurns: 0,
        newRenfort: '',
        newRenfortTurns: 0,
        difficulty: 0,
        newRenfortEffectType: '',
        newRenfortEffectValue: 0,
        newAfflictionEffectType: '',
        newAfflictionEffectValue: 0,
        damageEffect: 0
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
      entity.renforts.forEach(renfort => {
        if (renfort.turnsRemaining > 0) {
          renfort.turnsRemaining--;
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

  processDiceRoll() {
    if (this.diceRollResult !== null) {
      const selectedEntity = this.selectedEntityId !== null ? this.entities.find(entity => entity.id === this.selectedEntityId) : null;
      const targetEntity = this.targetEntityId !== null ? this.entities.find(entity => entity.id === this.targetEntityId) : null;
      console.log(`Résultat du jet de dé: ${this.diceRollResult}, Type: ${this.diceRollType || 'Non spécifié'}, Entité: ${selectedEntity ? selectedEntity.name : 'Non spécifiée'}, Cible: ${targetEntity ? targetEntity.name : 'Non spécifiée'}`);
      
    }
  }
}
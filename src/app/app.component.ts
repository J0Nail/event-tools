import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EntityListComponent } from './entity/entity-list/entity-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EntityListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'event-tools';
}

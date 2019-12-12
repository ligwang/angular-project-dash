import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
        <router-outlet>
            <div class="loading"></div>
        </router-outlet>
    `
})

export class AppComponent {
}

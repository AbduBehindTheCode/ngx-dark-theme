import { DOCUMENT, NgIf } from '@angular/common';
import { Component, inject, Inject, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ModeEnum } from '../ngx-dark-theme.enum';
import { NgxDarkModeService } from '../ngx-dark-theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-dark-theme-toggle',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ToggleComponent {
  darkMode = false;

  @Input() disableModeStorage = false;
  
  @Input() hideLabel = false;
  
  @Input() labelText = 'Dark mode';

  private ngxDarkModeService = inject(NgxDarkModeService);
  private renderer = inject(Renderer2);
  
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'dark-theme');

    if (this.disableModeStorage) {
      this.ngxDarkModeService.disableDarkModeStateStorage();
    }

    this.darkMode = this.ngxDarkModeService.getDarkModeState();
    
    this.document.body.classList.add(this.darkMode ? ModeEnum.DARK : ModeEnum.LIGHT)
  }
  

  setDarkMode(event: any) {
    this.darkMode = event.target.checked;
    this.document.body.classList.toggle(ModeEnum.DARK);
    this.document.body.classList.toggle(ModeEnum.LIGHT);

    if (!this.disableModeStorage) {
      this.ngxDarkModeService.storeDarkModeState(this.darkMode);
    }
  }
}

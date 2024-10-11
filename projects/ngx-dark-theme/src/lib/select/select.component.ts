import { DOCUMENT, NgFor, NgIf } from '@angular/common';
import { Component, Inject, inject, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxDarkModeService } from '../ngx-dark-theme.service';
import { ModeEnum } from '../ngx-dark-theme.enum';

@Component({
  selector: 'ngx-dark-theme-select',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
  isOptionsListVisible = false;
  selectedTheme = 'light';
  darkMode = false;

  @Input() disableModeStorage = false;
    
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


  onThemeSelection(theme: string) {
    this.darkMode = theme === ModeEnum.DARK;
    this.selectedTheme = theme;
    this.isOptionsListVisible = false;

    if (theme === 'dark') {
      this.document.body.classList.add(ModeEnum.DARK);
      this.document.body.classList.remove(ModeEnum.LIGHT);
    } else {
      this.document.body.classList.add(ModeEnum.LIGHT);
      this.document.body.classList.remove(ModeEnum.DARK);
    }

    if (!this.disableModeStorage) {
      this.ngxDarkModeService.storeDarkModeState(this.darkMode);
    }
  }

  toggleDropdown() {
    this.isOptionsListVisible = !this.isOptionsListVisible;
  }
}

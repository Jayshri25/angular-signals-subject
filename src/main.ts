import { Component, computed, effect, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map } from 'rxjs';
import { SignalShowcaseComponent } from './signal-showcase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SignalShowcaseComponent],
  styleUrls: ['./styles.css'], // Linking external CSS
  template: `
    <div class="container">
      <h2>Comparison: Signals vs. RxJS</h2>

      <div class="grid">
        <div class="card signal-card">
          <h3>⚡ Signals</h3>
          <p>Value: <b>{{ countSig() }}</b></p>
          <p>Double: <b>{{ doubleSig() }}</b></p>
          <button (click)="incSig()">Increment</button>
        </div>

        <div class="card rxjs-card">
          <h3>🌊 RxJS</h3>
          <p>Value: <b>{{ count$ | async }}</b></p>
          <p>Double: <b>{{ double$ | async }}</b></p>
          <button (click)="incRx()">Increment</button>
        </div>
      </div>
    </div>
    <app-signal-showcase></app-signal-showcase>
  `,
})
export class App {
  // --- 1. SIGNAL APPROACH ---
  countSig = signal(0); 
  doubleSig = computed(() => this.countSig() * 2); // Derived state (Auto-tracks)

  // --- 2. RXJS APPROACH ---
  count$ = new BehaviorSubject(0);
  double$ = this.count$.pipe(map(v => v * 2)); // Derived state (Requires Pipe)

  constructor() {
    // --- 3. SIDE EFFECTS ---
    // Signals use 'effect' (runs automatically when countSig changes)
    effect(() => console.log('Signal changed:', this.countSig()));

    // RxJS uses 'subscribe' (requires manual cleanup in real apps)
    this.count$.subscribe(v => console.log('RxJS changed:', v));
  }

  incSig() {
    this.countSig.update(v => v + 1); // Signal update syntax
  }

  incRx() {
    this.count$.next(this.count$.value + 1); // RxJS push syntax
  }
}

bootstrapApplication(App);
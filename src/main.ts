import { Component, computed, effect, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  template: `
    <h1>Hello from {{ name }}!</h1>

    <div style="padding: 30px; font-family: 'Segoe UI', sans-serif; line-height: 1.6;">
      <h2 style="color: #dd0031;">Angular Reactivity: Signals vs. RxJS</h2>
    

      <div style="display: flex; gap: 20px;">
        
        <div style="border: 2px solid #5eb1ff; padding: 20px; border-radius: 8px; flex: 1;">
          <h3>⚡ Signals Approach</h3>
          <p>Current Count: <strong>{{ countSignal() }}</strong></p>
          <p>Double (Computed): <strong>{{ doubleSignal() }}</strong></p>
          
          <button (click)="incrementSignal()" style="background: #5eb1ff;  padding: 10px; cursor: pointer;">
            Increment Signal
          </button>
          <ul style="font-size: 0.8rem; margin-top: 10px;">
            <li>No Async pipe needed</li>
            <li>Glitch-free (synchronous)</li>
          </ul>
        </div>

        <div style="border: 2px solid #c2185b; padding: 20px; border-radius: 8px; flex: 1;">
          <h3>Streams (RxJS)</h3>
          <p>Current Count: <strong>{{ countSubject$ | async }}</strong></p>
          <p>Double (Pipe): <strong>{{ doubleObservable$ | async }}</strong></p>
          
          <button (click)="incrementSubject()" style="background: #c2185b; padding: 10px; cursor: pointer;">
            Increment Subject
          </button>
          <ul style="font-size: 0.8rem; margin-top: 10px;">
            <li>Requires <code>| async</code> pipe</li>
            <li>Powerful for event streams</li>
          </ul>
        </div>

      </div>
    </div>
  `,
})
export class App {
  name = 'Jayshri';

  // --- 1. SIGNAL IMPLEMENTATION ---
  countSignal = signal(0);

  // A computed signal automatically updates when countSignal changes
  doubleSignal = computed(() => this.countSignal() * 2);

  constructor() {
    // Effect runs whenever the signal inside it changes
    effect(() => {
      console.log('Signal changed to:', this.countSignal());
    });
  }

  incrementSignal() {
    this.countSignal.update((val) => val + 1);
  }

  // --- 2. RXJS IMPLEMENTATION ---
  // BehaviorSubject holds the current value
  private countSubject = new BehaviorSubject<number>(0);

  // Expose as Observable for the template
  countSubject$ = this.countSubject.asObservable();

  // Use .pipe() to derive new values (similar to computed)
  doubleObservable$ = this.countSubject$.pipe(map((val) => val * 2));

  incrementSubject() {
    const currentValue = this.countSubject.value;
    this.countSubject.next(currentValue + 1);
    console.log('Subject pushed:', this.countSubject.value);
  }
}

bootstrapApplication(App);

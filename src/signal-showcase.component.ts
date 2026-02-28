import { Component, computed, effect, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-signal-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="showcase">
      <h3>🚦 Complete Signal Suite</h3>
      
      <div class="grid">
        <div class="item">
          <label>1. Writable</label>
          <p>Value: <b>{{ count() }}</b></p>
          <button (click)="increment()">Update</button>
        </div>

        <div class="item">
          <label>2. Computed</label>
          <p>Double: <b>{{ double() }}</b></p>
        </div>

        <div class="item">
          <label>3. Readonly</label>
          <p>Shielded: <b>{{ protectedCount() }}</b></p>
        </div>

        <div class="item">
          <label>4. toSignal (RxJS)</label>
          <p>Stream: <b>{{ timerSig() }}</b></p>
        </div>
      </div>
    </div>

    <style>
      .showcase { border-top: 2px solid #eee; margin-top: 20px; padding-top: 10px; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .item { background: #fff; padding: 10px; border-radius: 6px; border: 1px solid #ddd; }
      label { font-size: 0.7rem; color: #888; text-transform: uppercase; }
    </style>
  `
})
export class SignalShowcaseComponent {
  // TYPE 1: Writable Signal (Source of truth)
  count = signal(0);

  // TYPE 2: Computed Signal (Derived, read-only)
  double = computed(() => this.count() * 2);

  // TYPE 3: Read-only conversion (Encapsulation)
  // This prevents other components from calling .set() on this reference
  protectedCount = this.count.asReadonly();

  // TYPE 4: toSignal (RxJS Interop)
  // Converts an Observable into a Signal (removes need for async pipe)
  timerSig = toSignal(interval(2000), { initialValue: 0 });

  constructor() {
    // TYPE 5: Effect (Side effects)
    // Runs automatically whenever count() changes
    effect(() => {
      console.log('Effect triggered. Count is:', this.count());
    });
  }

  increment() {
    this.count.update(v => v + 1);
  }
}
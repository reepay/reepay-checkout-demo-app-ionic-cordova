import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AndroidCardCheckoutPage } from './android-card-checkout.page';

describe('AndroidCardCheckoutPage', () => {
  let component: AndroidCardCheckoutPage;
  let fixture: ComponentFixture<AndroidCardCheckoutPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidCardCheckoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AndroidCardCheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

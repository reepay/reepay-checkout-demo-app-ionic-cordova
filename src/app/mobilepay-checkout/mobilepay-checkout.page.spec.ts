import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobilepayCheckoutPage } from './mobilepay-checkout.page';

describe('MobilepayCheckoutPage', () => {
  let component: MobilepayCheckoutPage;
  let fixture: ComponentFixture<MobilepayCheckoutPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilepayCheckoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobilepayCheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

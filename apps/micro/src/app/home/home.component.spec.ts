import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Widget } from '@fem/api-interfaces';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateWidgets and getTotalPrice on reCalculateTotal', () => {
    spyOn(component, 'modifyWidgets').and.callThrough();
    spyOn(component, 'getTotalPriceOfWidgets').and.callThrough();

    const mockMode = 'create';
    const mockWidgets = [];
    const mockWidget = { id: '1', title: 'mock', description: 'mock', price: 100 };

    component.reCalculateTotal(mockMode, mockWidgets, mockWidget);

    expect(component.modifyWidgets).toHaveBeenCalledWith(
      mockMode,
      mockWidgets,
      mockWidget
    );
    expect(component.getTotalPriceOfWidgets).toHaveBeenCalled();
  });

  it('should call the appropriate method depending on mode in updateWidgets', () => {
    const mockWidget = { id: '1', title: 'mock', description: 'mock', price: 100 };

    spyOn(component, 'appendWidget').and.callThrough();
    spyOn(component, 'updateWidget').and.callThrough();
    spyOn(component, 'deleteWidget').and.callThrough();

    component.modifyWidgets('create', [], mockWidget);
    expect(component.appendWidget).toHaveBeenCalledWith([], mockWidget);

    component.modifyWidgets('update', [], mockWidget);
    expect(component.updateWidget).toHaveBeenCalledWith([], mockWidget);

    component.modifyWidgets('delete', [], mockWidget);
    expect(component.deleteWidget).toHaveBeenCalledWith([], mockWidget);
  });

  it('should add a widget on addWidget', () => {
    let widgets = [];
    const widget: Widget = {
      id: null,
      title: 'new item',
      description: 'new item',
      price: 100,
    };

    expect(widgets.length).toBe(0);

    widgets = component.appendWidget(widgets, widget);

    expect(widgets.length).toBe(1);
  });

  it('should update a widget on updateWidget', () => {
    let widgets: Widget[] = [
      { id: '100', title: 'new item', description: 'new item', price: 100 },
    ];
    const widget: Widget = {
      id: '100',
      title: 'UPDATED',
      description: 'WIDGET',
      price: 100,
    };

    widgets = component.updateWidget(widgets, widget);

    expect(widgets[0]).toEqual(widget);
  });

  it('should delete a widget on deleteWidget', () => {
    let widgets: Widget[] = [
      { id: '100', title: 'new item', description: 'new item', price: 100 },
    ];
    const widget: Widget = {
      id: '100',
      title: 'new item',
      description: 'new item',
      price: 100,
    };

    expect(widgets.length).toBe(1);

    widgets = component.deleteWidget(widgets, widget);

    expect(widgets.length).toBe(0);
  });

  it('should get total price on getTotalPrice', () => {
    const widgets: Widget[] = [
      { id: '1', title: 'mock', description: 'mock', price: 100 },
      { id: '2', title: 'mock', description: 'mock', price: 200 },
      { id: '3', title: 'mock', description: 'mock', price: 300 },
    ];

    const total = component.getTotalPriceOfWidgets(widgets);

    expect(total).toBe(600);
  });
});

import { Component } from '@angular/core';
import { Widget } from '@fem/api-interfaces';
import { v4 as uuidv4 } from 'uuid';

type Modes = 'create' | 'update' | 'delete';

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  price;
  mode: Modes;
  widgets: Widget[];

  reCalculateTotal(mode: Modes, widgets: Widget[], widgetToModify: Widget): void {
    this.widgets = this.modifyWidgets(mode, widgets, widgetToModify);
    this.price = this.getTotalPriceOfWidgets(widgets);
  }

  modifyWidgets(mode: Modes, widgets: Widget[], widgetToModify: Widget): Widget[] | never {
    switch (mode) {
      case 'create':
        return this.appendWidget(widgets, widgetToModify);
      case 'update':
        return this.updateWidget(widgets, widgetToModify);
      case 'delete':
        return this.deleteWidget(widgets, widgetToModify);
      default:
        throw new TypeError(`Mode: ${mode} is not supported by this method`);
    }
  }

  getTotalPriceOfWidgets(currentWidgets: Widget[]): number {
    return currentWidgets.reduce((acc, curr) => acc + curr.price, 0);
  }

  appendWidget(currentWidgets: Widget[], newWidgetData: Widget): Widget[] {
    const newWidget = Object.assign({}, newWidgetData, { id: uuidv4() });
    return [...currentWidgets, newWidget];
  }

  updateWidget(currentWidgets: Widget[], updatedWidgetData: Widget): Widget[] {
    return currentWidgets.map((currentWidget) =>
      updatedWidgetData.id === currentWidget.id
        ? Object.assign({}, updatedWidgetData)
        : currentWidget
    );
  }

  deleteWidget(currentWidgets: Widget[], widgetToDelete: Widget): Widget[] {
    return currentWidgets.filter(
      (__widget) => widgetToDelete.id !== __widget.id
    );
  }
}

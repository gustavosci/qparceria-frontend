import { 
    Directive, 
    HostListener, 
    Input, 
    ElementRef 
  } from '@angular/core';
  import { 
    NG_VALUE_ACCESSOR, ControlValueAccessor 
  } from '@angular/forms';
  
  @Directive({
    selector: '[appMask]',
    providers: [{
      provide: NG_VALUE_ACCESSOR, 
      useExisting: AppMaskDirective, 
      multi: true 
    }]
  })
  export class AppMaskDirective implements ControlValueAccessor {
  
    onTouched: any;
    onChange: any;
  
    @Input('appMask') appMask: string;
  
    constructor(private el: ElementRef) {}
  
    writeValue(value: any): void {
      if (value) {
        this.el.nativeElement.value = this.applyMask(value);
      }
    }
  
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    @HostListener('keyup', ['$event']) 
    onKeyup($event: any) {
      let valor = $event.target.value.replace(/\D/g, '');
  
      if ($event.keyCode === 8) {
        this.onChange(valor);
        return;
      }
  
      let pad = this.appMask.replace(/\D/g, '').replace(/9/g, '_');
      if (valor.length <= pad.length) {
        this.onChange(valor);
      }
  
      $event.target.value = this.applyMask(valor);
    }
  
    @HostListener('blur', ['$event']) 
    onBlur($event: any) {
      if ($event.target.value.length === this.appMask.length) {
        return;
      }
      this.onChange('');
      $event.target.value = '';
    }
  
    applyMask(valor: any): string {
      if(typeof valor === "number"){
          valor = valor.toString();
      }  
      valor = valor.replace(/\D/g, '');
      let pad = this.appMask.replace(/\D/g, '').replace(/9/g, '_');
      let valorMask = valor + pad.substring(0, pad.length - valor.length);
      let valorMaskPos = 0;
      
      valor = '';
      for (let i = 0; i < this.appMask.length; i++) {
        if (isNaN(parseInt(this.appMask.charAt(i)))) {
          valor += this.appMask.charAt(i);
        } else {
          valor += valorMask[valorMaskPos++];
        }
      }
      
      if (valor.indexOf('_') > -1) {
        valor = valor.substr(0, valor.indexOf('_'));
      }
  
      return valor;
    }
  }
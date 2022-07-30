import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() color: string = '#ffff';
  @Input() bgColor: string = '#EC7000';
  @Input() type: string = 'submit';
  @Input() border: string = '0px';
  @Input() padding: string = '15px 11px';
  @Input() fontSize: string = '16px';
  @Input() borderRadius: string = '5px';
  @Input() width: string = '130px';

  constructor() { }

  ngOnInit(): void {
  }
}

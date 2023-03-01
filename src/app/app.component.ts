import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loginForm!: FormGroup;
  colors!:string[];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
   this.initForm()
   this.checkPasswordStrength();
  }

  initForm():void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get password() {
    return this.loginForm.get('password');
  }
  
  checkPasswordStrength():void {
    this.password?.valueChanges.subscribe(value => {
      if (!value) {
        this.colors = ['lightgray', 'lightgray', 'lightgray'];
      } else if (value && value.length < 8) {
        this.colors = ['red', 'lightgray', 'lightgray'];
      } else if (/^[a-zA-Z]+$/.test(value) || /^[0-9]+$/.test(value)) {
        this.colors = ['red', 'lightgray', 'lightgray'];
      } else if (/^[a-zA-Z0-9]+$/.test(value)) {
        this.colors = ['yellow', 'yellow', 'gray'];
      } else {
        this.colors = ['limegreen', 'limegreen', 'limegreen'];
      }
    })
  }

}

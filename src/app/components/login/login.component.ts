import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  registerUsername: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerAddress: string = '';
  private authService = inject(AuthService)
  private activeModal = inject(NgbActiveModal);
  onLogin() {
   
    // Implement login functionality
    try {
      this.authService.login(this.loginEmail, this.loginPassword).subscribe((res) => {
        console.log(res)
        localStorage.setItem('authToken', res.token)
        localStorage.setItem('user', JSON.stringify({name:res.user,address:res.address,userId:res.userId}))
        this.activeModal.close()
      })
    } catch (error) {
      console.log(error)
    }

  }
  onRegister() {
    const registerData = {
      username: this.registerUsername,
      email: this.registerEmail,
      password: this.registerPassword,
      address: this.registerAddress
    };
    this.authService.register(this.registerUsername, this.registerEmail, this.registerPassword, this.registerAddress).subscribe(res=>{
      localStorage.setItem('authToken', res.token)
      localStorage.setItem('user', JSON.stringify({name:res.user,address:res.address,userId:res.userId}))
      this.activeModal.close()
    })
  }
}

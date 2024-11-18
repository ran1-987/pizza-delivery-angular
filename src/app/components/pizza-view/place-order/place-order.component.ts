import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { LoginComponent } from '../../login/login.component';
import { DataService } from '../../../services/data.service';
import { SharedService } from '../../../services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {

  @Input() pizzaData: any
  isLoggedIn: boolean = false;
  private activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  private authService = inject(AuthService);
  private dataService = inject(DataService);
  private sharedService = inject(SharedService)
  // Close the modal
  closeModal() {
    const token = this.authService.getAuthToken()
    console.log(this.pizzaData)
    const userId = "67382a44beca63668dae12c9";
    const deliveryAddress = "123 Main St, Springfield";
    if (!token) {
      const modalRef = this.modalService.open(LoginComponent, { centered: true });
    } else {
      const user = localStorage.getItem('user')
      const ParseUser = JSON.parse(user as any)
      const transformedData = {
        userId: ParseUser.userId,
        pizzaItems: this.pizzaData.map((item: any) => ({
          pizzaId: item.pizzaId, // using original pizzaId
          quantity: item.quantity
        })),
        deliveryAddress: ParseUser.address,
        totalPrice:100
      };
      this.dataService.post_pizza(transformedData).subscribe(res => {
        console.log(res);
        this.activeModal.close()
        this.alertConfirmation()
        if(res){
          this.dataService.getOrdersByUserId(ParseUser.userId).subscribe((response) => {
            console.log(res)
            this.sharedService.updateData(response);
          })
        }
      })
      console.log(transformedData);
    }
    // this.activeModal.close('Order Confirmed');
  }

  // Dismiss the modal
  dismissModal() {
    this.activeModal.dismiss('Order Canceled');
  }

  alertConfirmation(){
    Swal.fire({
      position: 'center',
      title: 'Thank you for your order!',
      text: 'Your pizza will be delivered shortly. Enjoy your meal!',
      icon: 'success',  // You might want to use 'success' instead of 'warning' here.
      confirmButtonText: 'OK',
    }).then((result) => {
      // if (result.value) {
      //   Swal.fire(
      //     'Removed!',
      //     'Item removed successfully.',
      //     'success'
      //   )
      // } else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire(
      //     'Cancelled',
      //     'Item is safe.)',
      //     'error'
      //   )
      // }
    })
  }
}

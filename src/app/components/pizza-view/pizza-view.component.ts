import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaceOrderComponent } from './place-order/place-order.component';
// import Swal from 'sweetalert';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pizza-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-view.component.html',
  styleUrl: './pizza-view.component.scss'
})
export class PizzaViewComponent implements OnInit {
  pizzaQuantities: { [key: number]: number } = {};
  pizzas: any[] = []
  constructor(public dataService: DataService) { }
  private modalService = inject(NgbModal);
  ngOnInit(): void {
    this.dataService.get_Data('pizzas').subscribe((res) => {
      console.log(res)
      if (res) {
        this.pizzas = res;
        this.initializeQuantities()
      }
    })
  }

  // Initialize the quantity for each pizza when the page loads
  initializeQuantities(): void {
    this.pizzas.forEach((pizza, index) => {
      this.pizzaQuantities[index] = 0; // Initialize quantity to 0 for all pizzas
    });
  }

  // Increase quantity of a pizza
  increaseQuantity(index: number): void {
    this.pizzaQuantities[index]++;
  }

  // Decrease quantity of a pizza
  decreaseQuantity(index: number): void {
    if (this.pizzaQuantities[index] > 0) {
      this.pizzaQuantities[index]--;
    }
  }
  selectedPizza: any[] = []
  calculateTotalPrice(index: number): number {
    const pizza = this.pizzas[index];
    const quantity = this.pizzaQuantities[index] || 0; // Get quantity from pizzaQuantities

    return pizza.price * quantity;
  }
  placeOrder(): void {
    const order = this.pizzas
      .map((pizza, index) => {
        const quantity = this.pizzaQuantities[index];
        if (quantity > 0) {
          return {
            pizzaId: pizza.pizzaId,
            name: pizza.name,
            price: pizza.price,
            quantity: quantity,
            total: this.calculateTotalPrice(index)  // Calculate total price for this pizza
          };
        }
        return null;
      })
      .filter(pizza => pizza !== null);  // Remove any pizzas with 0 quantity
      if(order.length > 0){

        console.log('Order Summary:', order); // Output the order to the console (can be sent to a server)
        this.openVerticallyCentered(order)
      }else{

        this.alertConfirmation()
      }
    // alert('Order Placed: ' + JSON.stringify(order));  // Show order summary in alert (can be replaced with actual submission)
  }
  openVerticallyCentered(data: any) {
    const modalRef = this.modalService.open(PlaceOrderComponent, { centered: true });

    // Passing data to modal via the modalRef's componentInstance
    modalRef.componentInstance.pizzaData = data;

    // Listening for the result from the modal
    modalRef.result.then((result) => {
      // Handle data returned from modal
      console.log('Data from modal:', result);
    }).catch((error) => {
      console.log('Modal dismissed:', error);
    });
  }

  alertConfirmation(){
    Swal.fire({
      position: 'center',
      title: 'Please select at least one item',
      text: 'It looks like you haven’t chosen anything yet. Please select an item to proceed.',
      icon: 'warning',
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

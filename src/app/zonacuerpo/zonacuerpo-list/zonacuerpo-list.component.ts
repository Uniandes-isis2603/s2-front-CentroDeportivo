import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';
import {ToastrService} from 'ngx-toastr';
import { Zonacuerpo } from '../zonacuerpo';
import { ZonacuerpoService } from '../zonacuerpo.service';
import {ZonacuerpoDetail} from '../zonacuerpo-detail';

@Component({
  selector: 'app-zonacuerpo-list',
  templateUrl: './zonacuerpo-list.component.html',
  styleUrls: ['./zonacuerpo-list.component.css']
})
export class ZonacuerpoListComponent implements OnInit {

    /**
   * Contructor del componente
   */
  constructor(private zonacuerpoService:ZonacuerpoService,
  private modalDialogService: ModalDialogService,
        private viewRef: ViewContainerRef,
        private toastrService: ToastrService) { }


/**
    * La lista de zonacuerpos del centro deportivo
    */
 zonacuerpos : Zonacuerpo[];
 selectedZonacuerpo : Zonacuerpo;
 zonacuerpo_id: number;
 showCreate: boolean;
  showEdit: boolean;
  zonacuerpo_edit_id: number;
   
 /**
   * Funcion para definir en seleccion
   */
onSelected(zonacuerpo_id: number):void {
        this.showCreate = false;
        this.zonacuerpo_id = zonacuerpo_id;
    this.selectedZonacuerpo = new ZonacuerpoDetail();
    this.getZonacuerpoDetail();
}   
 
/**
   * Funcion para despliegue para creacion
   */  
showHideCreate(): void {
     if (this.selectedZonacuerpo) {
               this.selectedZonacuerpo = undefined;
               this.zonacuerpo_id = undefined;
        }
        this.showCreate = !this.showCreate;
    }
    /**
   * Obtiene el servicio para actualizar la lista de especialistas
   */
    getZonacuerpoDetail(): void {
         this.zonacuerpoService.getZonacuerpoDetail(this.zonacuerpo_id)
            .subscribe(selectedZonacuerpo => {
                this.selectedZonacuerpo = selectedZonacuerpo
            });
    }
    /**
    * Obtiene el detalle del especialista
    */
 getZonacuerpos(): void{
     this.zonacuerpoService.getZonacuerpos().subscribe(zonacuerpos => this.zonacuerpos = zonacuerpos);
 }
 showHideEdit(zonacuerpo_id: number): void {
        if (!this.showEdit || (this.showEdit && zonacuerpo_id != this.zonacuerpo_edit_id)) {
            this.showCreate = false;
            this.showEdit = true;
            this.zonacuerpo_edit_id = zonacuerpo_id;
        }
        else {
            this.showEdit = false;
        }
    }
    updateZonacuerpo(): void {
        this.showEdit = false;
    }

    /**
    * Deletes an zonacuerpo
    */
    deleteZonacuerpo(zonacuerpoId): void {
        this.modalDialogService.openDialog(this.viewRef, {
            title: 'Delete an zonacuerpo',
            childComponent: SimpleModalComponent,
            data: {text: 'Are you sure your want to delete this zonacuerpo from the BookStore?'},
            actionButtons: [
                {
                    text: 'Yes',
                    buttonClass: 'btn btn-danger',
                    onAction: () => {
                        this.zonacuerpoService.deleteZonacuerpo(zonacuerpoId).subscribe(() => {
                            this.toastrService.error("The zonacuerpo was successfully deleted", "Zonacuerpo deleted");
                            this.ngOnInit();
                        }, err => {
                            this.toastrService.error(err, "Error");
                        });
                        return true;
                    }
                },
                {text: 'No', onAction: () => true}
            ]
        });
    }
 /**
   * Definicion de funcion para inicio
   */
  ngOnInit() {
      this.showCreate = false;
       this.showEdit = false;
      this.selectedZonacuerpo = undefined;
      this.zonacuerpo_id = undefined;
      this.getZonacuerpos();
  }
}

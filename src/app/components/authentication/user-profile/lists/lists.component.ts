import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { ListService } from '../../../../services/list.service';
import { AuthService } from '../../auth.service';

declare var bootstrap: any;

// LISTS
  interface GameInList {
  userId: number;
  gameId: number;
  gameName: string;
  gameImage: string;
}

interface UserList {
  id: number;
  title: string;
  description: string;
  games: GameInList[];
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  @ViewChild('listModal') listModal!: ElementRef;
  modalInstance: any;


  
  lists: UserList[] = [];
  newList = { title: '', description: ''};

  constructor (
    private listService: ListService,
    private auth: AuthService
  ) {}

ngOnInit() {
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  this.listService.getUserLists(userId).subscribe({
    next: (lists) => {
      this.lists = lists.map(l => ({
        ...l,
        games: l.games ?? []
      }));
    },
    error: (err) => console.error('❌ Error cargando listas', err)
  });
}


  // Open list modal
  openListModal() {
    const modalEl = this.listModal.nativeElement;
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  // Save new list
  saveNewList() {
    if(!this.newList.title.trim()) {
      alert('Title is required');
      return;
    }

    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.listService.createList(userId, this.newList).subscribe({
      next: (createdList) => {
        // añadir la lista recién creada al arreglo local
        this.lists.unshift(createdList);
        this.newList = { title: '', description: ''};
        this.modalInstance.hide();
      },
      error: (err) => console.log('❌ Error creando lista', err)
    });
  }

  deleteList(listId: number) {
    if(!confirm('Are you sure you want to delete this list? ')) return;

    this.listService.deleteList(listId).subscribe({
      next: () => {
        this.lists = this.lists.filter(l => l.id !== listId);
      },
      error: (err) => console.log('❌ Error borrando lista', err)
    })
  }

}

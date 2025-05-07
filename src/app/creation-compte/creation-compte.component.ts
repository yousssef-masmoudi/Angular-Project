import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/Modeles/Client';
import { ClientService } from 'src/Services/client.service';

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent implements OnInit {
  client: Client | null = null;
  form!: FormGroup;
  idcourant!: string;

  constructor(
    private MS: ClientService,
    private router: Router,
  ) {}

  ngOnInit(): void {
   
      this.initForm();
    
  }

  onsub(): void {
  
      const clientToSave = this.form.value;
      this.MS.ONSAVE(clientToSave).subscribe(() => {
        this.router.navigate(['/']);
      });
    
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(this.generateRandomId(), [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
       createdDate: new FormControl(new Date(), [Validators.required])
    });
  }

  

  private generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

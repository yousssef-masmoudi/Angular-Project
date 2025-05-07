import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/Modeles/Client';
import { ClientService } from 'src/Services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit{
  client: Client | null = null;
  form!: FormGroup;
  idcourant!: string;

  constructor(
    private MS: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idcourant = this.activatedRoute.snapshot.params['id'];
    if (!!this.idcourant) {
      this.MS.getClientById(this.idcourant).subscribe((client) => {
        this.client = client;
        this.initForm2(client);
      });
    } else {
      this.initForm();
    }
  }

  onsub(): void {
    if (!!this.idcourant) {
      this.MS.updateClient(this.idcourant, this.form.value).subscribe(() => {
        this.router.navigate(['/client']);
      });
    } else {
      const clientToSave = this.form.value;
      this.MS.ONSAVE(clientToSave).subscribe(() => {
        this.router.navigate(['/client']);
      });
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      createdDate: new FormControl(new Date(), [Validators.required])
    });
  }

  initForm2(client: Client): void {
    this.form = new FormGroup({
      name: new FormControl(client.name, [Validators.required]),
      email: new FormControl(client.email, [Validators.required]),
      password: new FormControl(client.password, [Validators.required]),
      createdDate: new FormControl(client.createdDate, [Validators.required])
    });
  }
}

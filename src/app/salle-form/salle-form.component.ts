import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Salle } from 'src/Modeles/Salle';
import { SalleService } from 'src/Services/salle.service';

@Component({
  selector: 'app-salle-form',
  templateUrl: './salle-form.component.html',
  styleUrls: ['./salle-form.component.css']
})
export class SalleFormComponent {
  form!: FormGroup;
  idcourant!: string;
  salle: Salle | null = null;

  constructor(
    private salleService: SalleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idcourant = this.activatedRoute.snapshot.params['id'];
    if (!!this.idcourant) {
      this.salleService.getSalleById(this.idcourant).subscribe((salle) => {
        this.salle = salle;
        this.initForm2(salle);
      });
    } else {
      this.initForm();
    }
  }

  onsub(): void {
    if (!!this.idcourant) {
      this.salleService.updateSalle(this.idcourant, this.form.value).subscribe(() => {
        this.router.navigate(['/salle']);
      });
    } else {
      const salleToSave = this.form.value;
      this.salleService.ONSAVE(salleToSave).subscribe(() => {
        this.router.navigate(['/salle']);
      });
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      capacite: new FormControl(null, [Validators.required]),
      prix: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required])
    });
  }

  initForm2(salle: Salle): void {
    this.form = new FormGroup({
      name: new FormControl(salle.name, [Validators.required]),
      capacite: new FormControl(salle.capacite, [Validators.required]),
      prix: new FormControl(salle.prix, [Validators.required]),
      description: new FormControl(salle.description, [Validators.required]),
      image: new FormControl(salle.image, [Validators.required])
    });
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TaxonomyComponent } from "./taxonomy/taxonomy.component";
import {WorkspaceComponent} from "./workspace/workspace.component";

const routes: Routes = [
  {
    path: 'taxonomy',
    component: TaxonomyComponent
  },
  {
    path: 'workspace',
    component: WorkspaceComponent
  },
  {
    path: '**',
    redirectTo: 'workspace'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class EditorRoutingModule { }

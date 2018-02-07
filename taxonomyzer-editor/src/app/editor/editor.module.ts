import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxonomyComponent } from './taxonomy/taxonomy.component';
import {
  MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatListModule, MatSidenavModule,
  MatTooltipModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
  MatExpansionModule, MatCheckboxModule, MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditorRoutingModule } from "./editor-routing.module";
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  imports: [
    CommonModule,
    EditorRoutingModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatSidenavModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [TaxonomyComponent, WorkspaceComponent]
})
export class EditorModule { }

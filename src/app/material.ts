import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';
@NgModule({
	imports:
		[MatButtonModule, MatPaginatorModule, MatSnackBarModule, MatIconModule, MatInputModule, MatSortModule, MatFormFieldModule, MatTabsModule, MatTableModule, MatDialogModule, MatCardModule, MatProgressSpinnerModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule],
	exports: [MatButtonModule, MatPaginatorModule, MatSnackBarModule, MatIconModule, MatInputModule, MatSortModule, MatFormFieldModule, MatTabsModule, MatTableModule, MatCardModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule]
})

export class MaterialModule { }
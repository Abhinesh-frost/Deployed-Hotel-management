import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { AddRoom } from './add-room/add-room';
import { AddOffer } from './add-offer/add-offer';
import { AdminBookings } from './admin-bookings/admin-bookings';
import { ManageRooms } from './manage-rooms/manage-rooms';
import { EditRoom } from './edit-room/edit-room';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'add-room', component: AddRoom },
    { path: 'manage-rooms', component: ManageRooms },
    { path: 'edit-room/:id', component: EditRoom },
    { path: 'add-offer', component: AddOffer },
    { path: 'bookings', component: AdminBookings }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table= 'clients';

    protected $fillable = [
        'id_procceso',
        'priority',
        'avt',
        'clientName',
        'agenteName',
        'emailAddress',
        'address',
        'phone',
        'twoPhone',
        'callBackAppointment',
        'resortName',
        'location',
        'unitSize',
        'weeksPoints',
        'years',
        'maintenceFee',
        'priceOffered',
        'pendingBalance',
    ];
}

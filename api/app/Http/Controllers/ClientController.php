<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Clients = Client::all();
        $procesos = DB::table('procesos')->get();

        $Clientsx = json_decode($Clients, true);
        $procesosx = json_decode($procesos, true);

        $data = [];

        foreach ($procesosx as $proceso) {
            $id_proceso = $proceso['id'];
            $processName = $proceso['processName'];

            $items = []; // Reiniciar $items

            foreach ($Clientsx as $client) {
                $id = $client['id'];
                $id_proceso_client = $client['id_procceso'];
                $priority = $client['priority'];
                $clientName = $client['clientName'];
                $avt = $client['avt'];

                if ($id_proceso_client === $id_proceso) {
                    $arrayitem = array(
                        "id" => $id,
                        "priority" =>  $priority,
                        "title" =>  $clientName,
                        "chat" =>  0,
                        "attachment" =>  0,
                        "assignees" =>  array(
                            "avt" =>  $avt
                        )
                    );

                    array_push($items, $arrayitem);
                }
            }

            // Agregar los elementos a $data
            $arrayProceso = array(
                "name" => $processName,
                "items" => $items
            );
            array_push($data, $arrayProceso);
        } 

        return $data;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id_procceso' => 'required',
            'priority' => 'required',
            'avt' => 'required',
            'clientName' => 'required',
            'agenteName' => 'required',
            'emailAddress' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'twoPhone' => 'required',
            'callBackAppointment' => 'required',
            'resortName' => 'required',
            'location' => 'required',
            'unitSize' => 'required',
            'weeksPoints' => 'required',
            'years' => 'required',
            'maintenceFee' => 'required',
            'priceOffered' => 'required',
            'pendingBalance' => 'required',
        ], [
            'id_procceso.required' => 'Campo es obligatorio',
            'priority.required' => 'Campo es obligatorio',
            'avt.required' => 'Campo es obligatorio',
            'clientName.required' => 'Campo es obligatorio',
            'agenteName.required' => 'Campo es obligatorio',
            'emailAddress.required' => 'Campo es obligatorio',
            'address.required' => 'Campo es obligatorio',
            'phone.required' => 'Campo es obligatorio',
            'twoPhone.required' => 'Campo es obligatorio',
            'callBackAppointment.required' => 'Campo es obligatorio',
            'resortName.required' => 'Campo es obligatorio',
            'location.required' => 'Campo es obligatorio',
            'unitSize.required' => 'Campo es obligatorio',
            'weeksPoints.required' => 'Campo es obligatorio',
            'years.required' => 'Campo es obligatorio',
            'maintenceFee.required' => 'Campo es obligatorio',
            'priceOffered.required' => 'Campo es obligatorio',
            'pendingBalance.required' => 'Campo es obligatorio',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $Client = new Client();
        $Client->id_procceso = $request->id_procceso;
        $Client->priority = $request->priority;
        $Client->avt = $request->avt;
        $Client->clientName = $request->clientName;
        $Client->agenteName = $request->agenteName;
        $Client->emailAddress = $request->emailAddress;
        $Client->address = $request->address;
        $Client->phone = $request->phone;
        $Client->twoPhone = $request->twoPhone;
        $Client->callBackAppointment = $request->callBackAppointment;
        $Client->resortName = $request->resortName;
        $Client->location = $request->location;
        $Client->unitSize = $request->unitSize;
        $Client->weeksPoints = $request->weeksPoints;
        $Client->years = $request->years;
        $Client->maintenceFee = $request->maintenceFee;
        $Client->priceOffered = $request->priceOffered;
        $Client->pendingBalance = $request->pendingBalance;
        $Client->save();

        return response()
            ->json(['respuesta' => 'Datos guardados exitosamente.']);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $resultado = Client::find($id);
        return $resultado;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        //
    }

    public function proceso(Request $request, $id)
    {

       $Client = Client::findOrFail($id);
        $id_procceso = (intval($request->id_procceso));
        $suma = (1+$id_procceso);
        $Client->id_procceso = $suma;

        $Client->save();
        return response()
        ->json(['respuesta' => 'Datos actualizados exitosamente.']);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        
        $id_procceso = intval($request->id_procceso);
        $priority = intval($request->priority);

        $Client = Client::findOrFail($id);
        
        $Client->fill($request->only([
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
            'pendingBalance'
        ]));

        $Client->save();
        return response()
        ->json(['respuesta' => 'Datos actualizados exitosamente.']);
    }

    public function dead(Request $request, $id)
    {
        
        $Client = Client::findOrFail($id);
        
        $Client->id_procceso = 5;

        $Client->save();

        return response()
        ->json(['respuesta' => 'Registro eliminado exitosamente.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $id)
    {
        $embarque = Client::find($id);
        $embarque->delete();
    }
}

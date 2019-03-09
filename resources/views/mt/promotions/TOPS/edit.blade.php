@extends('projects.master.layout')

@section('title', 'EditTitle')


@section('content')
	<h1 class="title">Edit Project</h1>
	<h5>Name :: {{ Auth::user()->name }} || {{ Auth::user()->id }}</h5>
	<p>Email :: {{ Auth::user()->email }}</p>

	<form method="POST" action="/projects/{{ $project->id }}">

		@method('PATCH') @csrf
		@include('forms.input', ['id'=> 'idName','name' => 'title', 'placeholder' => 'Title... Enter', 'value' =>  $project->title , 'label' => 'Title'])

		@include('forms.textArea', ['name' => 'body','placeholder' => 'Body... Enter', 'label' => 'Body', 'value' =>  $project->body])

			
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>

	<form 
		method="POST" 
		action="/projects/{{ $project->id }}" 
		style="margin-top:  1em;"
	>
		@method('DELETE') @csrf
		
		<button type="submit" class="btn btn-danger">Deleted</button>
	</form>
@endsection


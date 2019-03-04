@extends('projects.master.layout')

@section('title', 'Title') {{-- Title Name --}}


@section('content')
<!-- Start / New Project -->		
<section>
	<h1>Create New Project ID : {{auth()->id()}}</h1>

	<form method="POST" action="/projects">
		@method('POST') @csrf

			@include('forms.input', [
				'name' => 'title', 
				'placeholder' => 'Title... Enter', 
				'value' => '', 
				'label' => 'หัวข้อBody',
				'value' => old('title'),
				'required' => 'required',
				]
			)

			@include(
				'forms.textArea', [
					'name' => 'body',
					'placeholder' => 'Body... Enter', 
					'label' => 'หัวข้อBody', 
					'value' => old('title'),
					'required' => 'required',
					]
			)
			



		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
</section>
<!-- End / New Project -->
	@include('forms.errors')

	

@endsection


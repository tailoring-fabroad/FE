<script lang="ts">
    import type { Article } from '$lib/types';
	
	export let data: {
		articles: Article[];
	};

	const { articles } = data;

    
	function previewImage(event: Event) {
		const input = event.target as HTMLInputElement;
		const preview = document.getElementById('imagePreview') as HTMLImageElement;

		if (input.files && input.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				preview.src = e.target?.result as string;
			};
			reader.readAsDataURL(input.files[0]);
		}
	}
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100 min-h-screen font-sans">
	<div class="space-y-6">
		<h2 class="text-2xl font-bold mb-4 text-gray-800">Articles</h2>

		{#each articles as article}
			<article class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
				<header class="text-xl font-semibold text-gray-900 mb-2">
					{article.title}
				</header>
				<p class="text-gray-700 mb-4">{article.description}</p>

				<div class="flex gap-3">
					<form method="POST" action="?/deleteArticle">
						<input type="hidden" name="slug" value={article.slug} />
						<button
							type="submit"
							class="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition"
						>
							Delete Article
						</button>
					</form>

					<a
						href={`/articles/${article.slug}`}
						class="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition text-center"
					>
						Edit Article
					</a>
				</div>
			</article>
		{/each}
	</div>

    <form
    	action="?/createArticle"
    	method="POST"
    	enctype="multipart/form-data"
    	class="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col gap-4"
    >
    	<h3 class="text-xl font-bold text-gray-800">New Article</h3>

    	<div>
    		<label for="title" class="block font-medium mb-1 text-gray-700">Title</label>
    		<input
    			type="text"
    			id="title"
    			name="title"
    			required
    			class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
    		/>
    	</div>

    	<div>
    		<label for="image" class="block font-medium mb-1 text-gray-700">Upload Image</label>
    		<input
    			type="file"
    			id="image"
    			name="image"
    			accept="image/*"
    			required
    			class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
    			on:change={(e) => previewImage(e)}
    		/>
            <img id="imagePreview" class="mt-3 rounded max-h-52" alt="" aria-hidden="true" />
    	</div>

        <div>
    		<label for="body" class="block font-medium mb-1 text-gray-700">Body</label>
    		<input
    			id="body"
    			name="body"
    			required
    			class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
    		>
    	</div>

    	<div>
    		<label for="description" class="block font-medium mb-1 text-gray-700">Description</label>
    		<textarea
    			id="description"
    			name="description"
    			rows="5"
    			required
    			class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
    		></textarea>
    	</div>

        <input type="hidden" name="tagList" value="" />

    	<button
    		type="submit"
    		class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    	>
    		Add Article
    	</button>
    </form>
</div>

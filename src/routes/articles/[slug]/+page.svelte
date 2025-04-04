<script lang="ts">
	import type { Article } from '$lib/types';

	export let data: {
		article: Article;
	};

	const { article } = data;
</script>


<form action="?/updateArticle&slug={article.slug}" method="POST" class="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
    <h3 class="text-xl font-bold">Editing {article.title}</h3>

    <div>
        <label for="title" class="block font-medium mb-1">Title</label>
        <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            class="w-full border border-gray-300 rounded px-3 py-2"
        />
    </div>

    <div>
        <label for="image" class="block font-medium mb-1">Image URL</label>
        <input
            type="text"
            id="image"
            name="image"
            value={article.image}
            class="w-full border border-gray-300 rounded px-3 py-2"
        />
    </div>

    <div>
        <label for="description" class="block font-medium mb-1">Description</label>
        <textarea
        	id="description"
        	name="description"
        	rows="5"
        	class="w-full border border-gray-300 rounded px-3 py-2"
        >{article.description}</textarea>
    </div>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Edit Article
    </button>
</form>
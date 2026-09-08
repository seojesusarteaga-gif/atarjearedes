import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog. Piezas sintomaticas y normativas: es donde esta el hueco (Bloque 3 de
 * la auditoria). Ninguna pieza comercial — eso ya lo cubren las landings.
 *
 * `servicios` y `zonas` alimentan el enlazado interno de cada articulo. La
 * funcion real del blog no es informar: es distribuir autoridad hacia las
 * paginas que convierten (patron Pociten, Bloque 4).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    // <title> corto para el SERP. El H1 usa `titulo`, que puede ser mas largo.
    tituloSeo: z.string().optional(),
    descripcion: z.string(),
    fecha: z.coerce.date(),
    categoria: z.string(),
    entradilla: z.string(),
    servicios: z.array(z.string()),
    zonas: z.array(z.string()),
    // Alimentan a la vez el bloque visible y el FAQPage del schema: una sola fuente.
    faqs: z.array(z.object({ p: z.string(), r: z.string() })).default([]),
  }),
});

export const collections = { blog };

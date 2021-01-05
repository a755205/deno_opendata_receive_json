import { Application,Router } from 'https://deno.land/x/oak/mod.ts';
import { syncData } from "./data.ts";

const app = new Application();
const port = 3000;
const router = new Router();

router
    .get('/api', (context) => { context.response.body = "API Works!"; })
    .get('/getData', async (context) => {
        let result = await syncData();
        let data = JSON.parse(result);
        let pp =``;

        data.records.locations.forEach((el:any) => {
                pp +=`<p> --- ${el.locationsName} ---</p>`
                el.location.forEach((el:any) => {
                    pp+=`<p>${el.locationName}</p>`;
                });
        });
        let html =`
            <html>
                <body>
                    ${pp}
                </body>
            </html>
        `;
        context.response.body = html; 
    })

app.use(async (context, next) => {
    console.log(`${context.request.method} ${context.request.url}`);
    await next();
});

app.use(router.routes());
app.use((context) => {
    context.response.body = "Hello World";
});
app.listen({ port });
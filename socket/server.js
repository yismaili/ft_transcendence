this.socket = io("http://localhost:3001/userstatus", {
    extraHeaders: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ5aXNtYWlsaSIsImZpcnN0TmFtZSI6InlvdW5lcyIsImxhc3ROYW1lIjoiaXNtYWlsaSIsImVtYWlsIjoieWlzbWFpbGkxMzM3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKeW9QLUJuZjcxVTVKcDBwWE5faUxSMHB0WDJWWXhnTEdlc09CTklKaVY5Zz1zOTYtYyIsInByb2ZpbGUiOnsiaWQiOjEsInNjb3JlIjowLCJsb3MiOjAsIndpbiI6MCwieHAiOjAsImxldmVsIjowfSwidXNlclJlbGF0aW9ucyI6W10sImZyaWVuZFJlbGF0aW9ucyI6W10sImFjaGlldmVtZW50cyI6W10sImhpc3RvcmllcyI6W10sImlhdCI6MTY5NDg2OTE1M30._BgOmYPL6IU0NV0VPf7W0G31DfT6wEvE-GuyMIRUsIk'
    }
});


this.socket = io("http://localhost:3001/userstatus", {
    extraHeaders: {
        Authorization: B_token
    }
});

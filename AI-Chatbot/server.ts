Deno.serve((req) => {


  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.addEventListener("open", () => {
    console.log("a client connected!");
  });
  
  socket.addEventListener("message", async (event) => {
    Deno.env.set("PYTHONIOENCODING", "utf-8");
    const query = event.data; 
    console.log("recieved message:", query);
    const command = new Deno.Command("py", {
      args: ["main.py", query],
    });
      console.log( command);
      const { stdout } = await command.output();
      await Deno.writeTextFile("python_output.txt", new TextDecoder().decode(stdout));
      const ans = await Deno.readTextFile("python_output.txt");
      const newans=ans.split("\r\n")[3];
      console.log("Sent response:",newans);
      socket.send(newans);
  });

  return response;
});

Deno.env.set("PYTHONIOENCODING", "utf-8");


const query = "hi"; 
    console.log("recieved message:", query);
    const command = new Deno.Command("py", {
      args: ["main.py", query],
    });
    console.log( command);
    const { stdout } = await command.output();
    await Deno.writeTextFile("python_output.txt", new TextDecoder().decode(stdout));
    const ans = await Deno.readTextFile("python_output.txt");
    const newans=ans.split("\r\n");
   console.log("Sent response:",newans[3]);
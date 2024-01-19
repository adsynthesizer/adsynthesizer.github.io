var vueinst = new Vue({
    el:"#app",
    data: {
        service: "home", 
        commands: [
            {'command': 'dbconfig', 'description': 'Set up the credentials with the database'},
            {'command': 'setparams', 'description': 'By default, ADSynthesizer uses its own configuration to generate the Active Directory attack graphs. ADSynthesizer allows users to customize the settings using the provided parameter descriptions.'},
            {'command': 'setdomain', 'description': 'Set the domain name of your Active Directory environment.'},
            {'command': 'cleardb', 'description': 'Clear the entire database, ready for the newly generated graphs.'},
            {'command': 'generate', 'description': 'An Active Directory attack graph will be constructed based on configuration setup.'},
            {'command': 'about', 'description': 'Information about ADSynthesizer'},
            {'command': 'exit', 'description': 'Exit the tool terminal'}
        ],
        params_title: ["Object", "Parameter", "Description", "Value"],
        params_dict: {}
    },
    methods: {
        loadExcelFile() {
            const excelFilePath = 'files/params_list.xlsx';
            this.params_dict = {}

            // Use Fetch API to load the file
            fetch(excelFilePath)
                .then(response => response.arrayBuffer())
                .then(data => {
                    const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet);

                    jsonData.forEach((line) => {
                        key = line.Object
                        if (!this.params_dict.hasOwnProperty(String(key))) {
                            this.params_dict[key] = []
                        }
                        const {Object, ...item} = line;
                        this.params_dict[key].push(item);
                    });
                })
                .catch(error => console.error('Error loading Excel file:', error));
        }
    }
});

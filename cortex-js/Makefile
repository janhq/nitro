CODE_SIGN ?= false
AZURE_KEY_VAULT_URI ?= xxxx
AZURE_CLIENT_ID ?= xxxx
AZURE_TENANT_ID ?= xxxx
AZURE_CLIENT_SECRET ?= xxxx
AZURE_CERT_NAME ?= xxxx
DEVELOPER_ID ?= xxxx

postbundle:
ifeq ($(RUN_TESTS),false)
	@echo "Skipping tests"
	@exit 0
endif
ifeq ($(OS),Windows_NT)
	@powershell -Command "7z a -ttar temp.tar cortex.exe; 7z a -tgzip cortex.tar.gz temp.tar;"
	@powershell -Command "7z a -ttar temp2.tar setup.exe; 7z a -tgzip cortex-installer.tar.gz temp2.tar;"
else ifeq ($(shell uname -s),Linux)
	@chmod +x cortex;
	tar -czvf cortex.tar.gz cortex;
else
	@chmod +x cortex;
	tar -czvf cortex.tar.gz cortex;
	tar -czvf cortex-installer.tar.gz cortex-installer.pkg;
endif


codesign:
ifeq ($(CODE_SIGN),false)
	@echo "Skipping Code Sign"
	@exit 0
endif

ifeq ($(OS),Windows_NT)
	@powershell -Command "dotnet tool install --global AzureSignTool;"
	@powershell -Command 'azuresigntool.exe sign -kvu "$(AZURE_KEY_VAULT_URI)" -kvi "$(AZURE_CLIENT_ID)" -kvt "$(AZURE_TENANT_ID)" -kvs "$(AZURE_CLIENT_SECRET)" -kvc "$(AZURE_CERT_NAME)" -tr http://timestamp.globalsign.com/tsa/r6advanced1 -v ".\cortex-js\cortex.exe";'
	@powershell -Command 'azuresigntool.exe sign -kvu "$(AZURE_KEY_VAULT_URI)" -kvi "$(AZURE_CLIENT_ID)" -kvt "$(AZURE_TENANT_ID)" -kvs "$(AZURE_CLIENT_SECRET)" -kvc "$(AZURE_CERT_NAME)" -tr http://timestamp.globalsign.com/tsa/r6advanced1 -v ".\cortex-js\setup.exe";'
else ifeq ($(shell uname -s),Linux)
	@echo "Skipping Code Sign for linux"
	@exit 0
else
	find "cortex" -type f -exec codesign --force -s "$(DEVELOPER_ID)" --options=runtime {} \;
endif
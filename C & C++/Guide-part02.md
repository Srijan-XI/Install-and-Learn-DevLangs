# Installing Latest C/C++ Compiler on Windows 11 (Quick Methods)

## 1. Using Winget (Built into Windows 11)
Winget can directly pull the compiler from official repositories.

### For GCC (MinGW-w64):
```powershell
winget install --id=GnuWin32.GCC
```
Or for a more up-to-date MinGW-w64 build:
```
winget install --id=WinLibs.MinGW-w64 --source=winget
```
### For LLVM Clang:
```
winget install LLVM.LLVM
```
### For Microsoft Build Tools (MSVC without full Visual Studio):
```
winget install --id=Microsoft.VisualStudio.2022.BuildTools --source=winget
```
- During install, select C++ build tools.

## 2. Using Chocolatey
If you install [Chocolatey](https://chocolatey.org/install), you can get compilers with one command.

### Install GCC:
```
choco install mingw
```

### Install LLVM Clang:
```
choco install llvm
```

### Install Visual Studio Build Tools:
```
choco install visualstudio2022buildtools
```
### Why This Method is Easier

- No manual downloading/unzipping.

- Automatic PATH setup.

- Easy to update later with:
  ```
  winget upgrade --all
  ``` 

or 

```
choco upgrade all
```

If you want, I can also prepare a **single combined `winget` script** in Markdown that installs GCC, Clang, and MSVC all at once so you have every major compiler ready. That way you’re set for any C/C++ project on Windows 11.


# qb-lock

https://streamable.com/fxjwpf

![image](https://github.com/yungmexx/qb-lock-redesign/assets/113365369/841a524b-f5b3-4509-bb5f-b02364b8b0f2)
![image](https://github.com/yungmexx/qb-lock-redesign/assets/113365369/ac118526-3366-4e74-815f-265fd8bddd42)
![image](https://github.com/yungmexx/qb-lock-redesign/assets/113365369/9a6aeb1a-3a93-4e1a-b813-29fa44922832)


# Template
```lua

exports['qb-lock']:StartLockPickCircle(amount, time, function(success)

```
# Example useage
```lua

RegisterCommand("lpgame", function()
	local time = math.random(7,10)
	local circles = math.random(2,4)
	local success = exports['qb-lock']:StartLockPickCircle(circles, time, success)
	print(success)
	if success then
		print("WIN")
	else
		print("FAIL")
	end
end)

```


## Useful Snippet
for everyone here that wants to add the minigame to other script in a very simple way

```lua

local seconds = math.random(9,12)
local circles = math.random(1,3)
local success = exports['qb-lock']:StartLockPickCircle(circles, seconds, success)
if success then
QBCore.Functions.Notify(" Success", "success")
end
```

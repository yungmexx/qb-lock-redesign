# qb-lock-redesign




EXPORT:


exports['qb-lock']:StartLockPickCircle(amount, time, function(success)

EXAMPLE:


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

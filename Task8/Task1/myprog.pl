# Необходимо вывести на экран все числа Фибоначчи, которые принадлежат отрезку от A до B.
out(A, B, Z, X, Y) :- checkOut(Z, A, B), Z_NEW = X + Y, X_NEW = Y, Y_NEW = Z_NEW, Z_NEW =< B, out(A,B,Z_NEW,X_NEW,Y_NEW).
checkOut(Z,A,B) :- Z_NEW is Z, (Z >= A, Z =< B -> write(Z_NEW), write(" ");write("")).

a :- write("Number 1: "), nl,
     read(A), nl, 
     write("Number 2: "), nl,
     read(B), nl,
     out(A, B, 1, 0, 1).
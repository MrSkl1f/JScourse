# С клавиатуры считываются числа A и B. Необходимо вывести на экран все числа, квадратный корень которых является целым числом. При этом, необходимо вывести только числа, которые принадлежат отрезку от A до B.

out(A, B, I) :- NEW_NUM = I * I, NEW_NUM =< B, checkOut(A, B, NEW_NUM), NEW_I = I + 1, out(A, B, NEW_I).
checkOut(A, B, NUM) :- NEW_NUM is NUM, (NUM >= A, NUM =< B -> write(NEW_NUM), write(" "); write("")).

a :- write("Number 1: "), nl,
    read(A), nl, 
    write("Number 2: "), nl,
    read(B), nl,
    out(A, B, 0).
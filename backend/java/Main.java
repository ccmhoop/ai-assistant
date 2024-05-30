import java.util.ArrayList;

public class Main {
    public static void main(String args[]) {
        int[] age = new int[] { 30, };
        ArrayList<String> name = new ArrayList<>();
        name.add("conner");
        System.out.println(name.get(0) + " " + age[0]);
        Main main = new Main();
        main.test();
    }

    public void test(){
        System.out.println("test");
    }
};